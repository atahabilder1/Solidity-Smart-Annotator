from fastapi import FastAPI, UploadFile, File
import os
from pathlib import Path
from slither import Slither

app = FastAPI()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/analyze/")
async def analyze_solidity(file: UploadFile = File(...)):
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(filepath, "wb") as f:
        f.write(file.file.read())
    
    # Run Slither analysis
    slither = Slither(filepath)
    contract_summaries = {contract.name: contract.functions for contract in slither.contracts}
    
    return {"contracts": contract_summaries}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)