import React, { useState } from "react";
import { isValid, verifyDocument } from "@trustvc/trustvc";

const App: React.FC = () => {
  const [verificationResult, setVerificationResult] = useState<{
    VALIDITY: boolean;
    DOCUMENT_INTEGRITY: boolean;
    DOCUMENT_STATUS: boolean;
    ISSUER_IDENTITY: boolean;
  } | null>(null);
  const [hasAttemptedUpload, setHasAttemptedUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHasAttemptedUpload(true);
    setIsLoading(true);

    const file = event.dataTransfer.files[0];
    if (!file) {
      setIsLoading(false);
      return;
    }

    try {
      const fileContent = await file.text();
      const vc = JSON.parse(fileContent);

      // RPC provuider url for interacting with the Amoy blockchain
      const rpc = "https://rpc-amoy.polygon.technology";

      const fragments = await verifyDocument(vc, rpc);
      const result = isValid(fragments); 
      const documentIntegrity = isValid(fragments, ["DOCUMENT_INTEGRITY"]);
      const documentStatus = isValid(fragments, ["DOCUMENT_STATUS"]);
      const issuerIdentity = isValid(fragments, ["ISSUER_IDENTITY"]);
      
      setVerificationResult({
        VALIDITY: result,
        DOCUMENT_INTEGRITY: documentIntegrity,
        DOCUMENT_STATUS: documentStatus,
        ISSUER_IDENTITY: issuerIdentity,
      });
    } catch (error) {
      setVerificationResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
      style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center" }}
    >
      <h1>Verify Documents</h1>
      <p>Drop a Verifiable Credential file here to verify</p>

      {isLoading && <div className="spinner">Verifying...</div>}

      {hasAttemptedUpload && !isLoading && !verificationResult && (
        <p style={{ color: "red" }}>File is not valid or could not be verified.</p>
      )}

      {!isLoading && verificationResult && (
        <div>
            <div>
              <h2>VALIDITY</h2>
              <ul>
                <li>{verificationResult?.VALIDITY ? "true" : "false"}</li>
              </ul>
            </div>
            <div>
              <h2>DOCUMENT_INTEGRITY</h2>
              <ul>
                <li>{verificationResult?.DOCUMENT_INTEGRITY ? "true" : "false"}</li>
              </ul>
            </div>
            <div>
              <h2>DOCUMENT_STATUS</h2>
              <ul>
                <li>{verificationResult?.DOCUMENT_STATUS ? "true" : "false"}</li>
              </ul>
            </div>
            <div>
              <h2>ISSUER_IDENTITY</h2>
              <ul>
                <li>{verificationResult?.ISSUER_IDENTITY ? "true" : "false"}</li>
              </ul>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
