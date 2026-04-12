import { pipeline } from '@huggingface/transformers'

const classifier = await pipeline('sentiment-analysis');

classifier('I love this movie!');
