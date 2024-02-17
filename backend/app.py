from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)
port = 3000


@app.route("/api/box", methods=["GET"])
def box_api():
    query = request.args.get("query", "")


    try:
        url = "https://useblackbox.io/chat-request-v4"
        payload = {
            "textInput": query,
        }

        response = requests.post(url, json=payload)
        answer = response.json()["response"][0][0]

        return jsonify({"answer": answer}), 200
    except Exception as error:
        return jsonify({"error": str(error)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=port)