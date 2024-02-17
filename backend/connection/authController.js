const crypto = require(`crypto`);
const { promisify } = require(`util`);
const AppError = require('../util/appError');
const User = require(`./../model/UserModel`);
const catchAsync = require('./../util/catchAsync');
const jwt = require(`jsonwebtoken`);
const sendEmail = require(`./../util/email`);

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
};
const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) if email and password exists
  if (!email || !password) {
    return next(new AppError(`Please enter a valid email and password`, 400));
  }
  // 2) if user exist and password is correct

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  sendToken(user, 200, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
    passwordChangedAt: req.body.passwordChangedAt,
    resetToken: req.body.resetToken,
    resetExpires: req.body.resetExpires,
    active: req.body.active
  });

  sendToken(newUser, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) get Token and check if exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(`Bearer`)
  ) {
    token = req.headers.authorization.split(` `)[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError(`You are not logged in please login to get access`, 401)
    );
  }
  // 2) Verification token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //   console.log(decoded);

  // 3) Check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  //4) If user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  //All Clear
  req.user = currentUser;
  next();
});

//Only for render pages
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      //   console.log(decoded);

      // 3) Check if user still exist
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      //4) If user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      //Its a logged in user
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }

  next();
};
exports.logout = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date.now() + 10 * 1000,
    httpOnly: true
  });
  res.status(100).json({ status: `success` });
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles [`admin`,`lead-guide`]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`Ypu do not have access to perform this operation`, 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) get User based on POSTed email
  if (!req.body.email) {
    return next(new AppError(`Please enter the required email address`, 401));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError(`User does not exist with email ${req.body.email}`, 404)
    );
  }
  //2) generate a random reset token
  const resToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //3) send it to user email
  const resetURL = `${req.protocol}::${req.get(
    `host`
  )}/api/v1/users/resetPassword/${resToken}`;

  const message = `Forgot your password? send a patch request with your new password and password
  confirm to: ${resetURL}.\n If you didnt submit this request, ignore it for once`;

  //if error occcur here we need to remove the token from db too
  try {
    await sendEmail({
      email: user.email,
      subject: `Your password reset token (for 10 minutes)`,
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    (user.resetToken = undefined),
      (user.resetExpires = undefined),
      await user.save({ validateBeforeSave: false });

    return next(new AppError(`Error sending the email! try again later`, 500));
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash(`sha256`)
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetToken: hashedToken,
    resetExpires: { $gt: Date.now() }
  });
  // 2) if the token has not yet expired, and there is user set new pass
  if (!user) {
    return next(new AppError(`Token invalid or expired`, 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetToken = undefined;
  user.resetExpires = undefined;
  await user.save();
  // 3) update changedpassword parameter

  // 4) log the user in with JWT
  sendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1)get the user
  const user = await User.findById(req.user.id).select(`+password`);
  // 2) check if password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError(`Current password is incorrect`, 401));
  }
  // 3) if yes then update
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // 4) Log user in,send JWT token
  sendToken(user, 200, res);
});
