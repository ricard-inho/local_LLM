# local_LLM
Run locally an LLM 

## Installation
```
conda create --name backend
conda install --yes --file backend/requirements.txt
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```

## Model convertion
Code extracted from MLX repo ([link](https://github.com/ml-explore/mlx-examples/tree/main/lora)).

To make a 4-bit quantized model, run:
```
python model_conversion/convert.py --hf-path <hf_repo> -q

python3 model_conversion/convert.py --hf-path mistralai/Mistral-7B-v0.1 -q --mlx-path models/ --hf-token <your_hf_token>
```



## Run 