from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import openai
import os
import tempfile

app = Flask(__name__)
CORS(app)

openai.api_key = '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'

@app.route('/api/python/transcribe/', methods=['POST'])
def transcribe_audio():
    print(request.files)
    try:
        if 'audio' not in request.files:
            print('No audio file provided.')
            return jsonify({'error': 'No audio file provided.'}), 400

        audio_file = request.files['audio']
        if audio_file.filename == '':
            print('No selected file.')
            return jsonify({'error': 'No selected file.'}), 400

        # Save the audio file temporarily
        temp_dir = tempfile.mkdtemp()
        temp_file_path = os.path.join(temp_dir, audio_file.filename)
        audio_file.save(temp_file_path)

        # Transcribe audio using Whisper model
        transcript = openai.Audio.transcribe("whisper-1", temp_file_path)
        print('Transcript:', transcript)

        # Generate GPT response
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": transcript}
            ]
        )

        gpt_response = completion.choices[0].message['content']
        print('GPT Response:', gpt_response)

        # Delete the temporary file after processing
        os.remove(temp_file_path)
        os.rmdir(temp_dir)

        return jsonify({'transcript': transcript, 'gpt_response': gpt_response}), 200

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
