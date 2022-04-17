import { Dispatch, FunctionComponent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../App.css';

const FileDropZone:FunctionComponent<{setSelectedFile: Dispatch<any> }> = ({setSelectedFile}) => {

    const [filesRejected , setfilesRejected] = useState(false);

    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles.length) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, []);

    const onDropRejected = useCallback((rejectedFiles: any) => {
        setfilesRejected(true);
        setSelectedFile({ name: ''})
    }, []);

    const onDropAccepted = useCallback((rejectedFiles: any) => {
        setfilesRejected(false);
    }, []);

    const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        onDropAccepted,
        multiple: false,
        accept: "image/jpeg,image/png",
    });
    return (
        <div className="dropzone-outer">
            <div {...getRootProps()} className="dropzone-inner">
                <input {...getInputProps()}/>
                <div className={'image-drop-container' + (isDragActive === true ? ' image-drop-active' : '') + (filesRejected === true ? ' image-drop-rejected' : '')}>
                    <img src="/Images/folder.png" alt="folder" className="folder-image" />
                    {isDragActive ? (
                        <div style={{ textAlign: 'center' }}>
                            <p>Drop File</p>
                        </div>
                    ) : (
                        <div className="drop-file-text">
                            <p>Drag & Drop Files Here</p>
                            <p className="dropzone-info">Only jpeg files are supported</p>
                            {filesRejected && <p style={{ textAlign: 'center', color: 'red' }}>File upload failed. Please Upload correct format</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileDropZone;