import { getFunctions } from "firebase/functions";
import { httpsCallable } from "firebase/functions";

const functions = getFunctions();
const generateUploadUrl = httpsCallable(functions,"generateUploadUrl");

export async function uploadFile(file: File) {
    const response :any = await generateUploadUrl({
        fileExtension: file.name.split('.').pop()
    });

    await fetch(response?.data?.url,{
        method: 'PUT',
        body: file,
        headers:{
            'Content-Type': file.type
        }
    });
    return;
}


