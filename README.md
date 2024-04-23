# Local LLM
LLama 3 running on Apple Silicon with [MLX](https://github.com/ml-explore/mlx)



## Backend
### Installation
```
conda create --name backend
conda install --yes --file backend/requirements.txt
conda install pytorch::pytorch torchvision torchaudio -c pytorch
conda install -c conda-forge mlx-lm
```

### Run 
```
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000
```

## Frontend
### Installation
```
npx create-react-app app
```

### Development mode
```
cd app
npm start
```

### Production
```
cd app
npm run build
```
