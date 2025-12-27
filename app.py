from flask import Flask, request, jsonify
import neural_network  # Импортируйте ваш модуль нейросети

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    question = data['question']
    # Здесь вызывается функция предсказания из вашего модуля нейросети
    answer = neural_network.predict(question)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
