"use client";

import {
  Image as ImageKitImage,
  ImageKitProvider,
  upload,
  Video as ImageKitVideo,
  type UploadResponse,
} from "@imagekit/next";
import config from "@/lib/config";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { PaperclipIcon } from "lucide-react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint ?? ""}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Authentication request failed: ${message}`);
  }
};

interface Props {
  type?: "image" | "video";
  accept?: string;
  placeholder?: string;
  folder?: string;
  variant?: "dark" | "light";
  onFileChange?: (fileUrl: string) => void;
  value?: string;
}

type UploadedFile = Pick<UploadResponse, "filePath" | "url">;

const FileUpload = ({
  type = "image",
  accept = "image/*",
  placeholder = "Upload your ID",
  folder = "/ids",
  onFileChange,
  value,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<UploadedFile | null>(value ? { filePath: value, url: value } : null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileSrc = file?.url ?? file?.filePath ?? "";
  const fileLabel = file?.filePath ?? file?.url ?? "";
  const uploadProgress = Math.max(progress, isUploading ? 8 : 0);

  const onError = (error: unknown) => {
    console.error(error);

    toast.error("Upload Failed", {
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
  };

  const onSuccess = (res: UploadResponse) => {
    const fileUrl = res.url ?? (res.filePath ? `${urlEndpoint}${res.filePath}` : "");

    setFile(res);
    onFileChange?.(fileUrl);

    toast.success(`${res.filePath ?? res.url} uploaded successfully!`);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File Too Large", {
          description: `Please upload a file that is less than 20MB in size`,
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File Too Large", {
          description: `Please upload a file that is less than 50MB in size`,
        });
        return false;
      }
    }

    return true;
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !onValidate(selectedFile)) {
      event.target.value = "";
      return;
    }

    setProgress(0);
    setIsUploading(true);

    try {
      const authParams = await authenticator();

      const response = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        folder,
        publicKey,
        useUniqueFileName: true,
        ...authParams,
        onProgress: ({ loaded, total }) => {
          if (!total) {
            return;
          }

          setProgress(Math.round((loaded / total) * 100));
        },
      });

      onSuccess(response);
    } catch (error) {
      onError(error);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input ref={inputRef} type='file' accept={accept} onChange={handleFileChange} className='hidden' />

      <button
        className='upload-btn'
        onClick={e => {
          e.preventDefault();
          inputRef.current?.click();
        }}
        disabled={isUploading}
      >
        <PaperclipIcon size={18} height={18} width={18} />
        <p className='text-medium text-nowrap'>{placeholder}</p>
        {file && <p className='upload-filename'>{fileLabel}</p>}
      </button>

      {isUploading && (
        <div
          className='mt-2 h-4 w-full overflow-hidden rounded-full border border-primary-foreground bg-primary'
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label={`${placeholder} upload progress`}
        >
          <div className='progress h-full transition-all duration-300' style={{ width: `${uploadProgress}%` }}>
            {progress > 0 ? `${progress}%` : "Uploading..."}
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <div className='overflow-hidden rounded-md! border border-border'>
            <ImageKitImage
              alt={fileLabel}
              src={fileSrc}
              width={500}
              height={300}
              className='block h-full w-full translate-y-[-1px] scale-[1.01] border-0! object-cover outline-none!'
            />
          </div>
        ) : type === "video" ? (
          <ImageKitVideo
            src={fileSrc}
            controls={true}
            className='h-96 w-full rounded-md! border border-border'
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
