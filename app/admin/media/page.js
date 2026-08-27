import React from 'react';
import MediaLibraryClient from './MediaLibraryClient';
import { getApiBase } from '@/lib/api-helper';
import { getMediaLibrary } from '@/lib/cms-service';

export const metadata = { title: 'Media Library - Admin' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MediaPage() {
  const apiBase = getApiBase();
  let mediaData = { media: [], total: 0, folders: [] };

  try {
    mediaData = await getMediaLibrary(24);
  } catch (err) {
    console.error('Failed to fetch media', err);
  }

  return (
    <div>
      <h1 className='text-[30px] font-bold'>MEDIA LIBRARY</h1>
      <p className="text-sm text-gray-600">
        Upload, manage, and organize your images and media files.
      </p>
      <div className="mt-5">
        <MediaLibraryClient
          initialMedia={mediaData.media}
          initialTotal={mediaData.total}
          initialFolders={mediaData.folders}
          apiBase={apiBase}
        />
      </div>
    </div>
  );
}
