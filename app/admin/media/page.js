import React from 'react';
import MediaLibraryClient from './MediaLibraryClient';

export const metadata = { title: 'Media Library - Admin' };

export default function MediaPage() {
  return (
    <div>
      <h1 className='text-[30px] font-bold'>MEDIA LIBRARY</h1>
      <p className="text-sm text-gray-600">
        Upload, manage, and organize your images and media files.
      </p>
      <div className="mt-5">
        <MediaLibraryClient
          initialMedia={[]}
          initialTotal={0}
          initialFolders={[]}
        />
      </div>
    </div>
  );
}

