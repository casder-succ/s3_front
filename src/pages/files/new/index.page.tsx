import Head from 'next/head';
import { NextPage } from 'next';
import { Group, Title, Stack, Box, Loader, Text, rem } from '@mantine/core';
import { filesApi } from 'resources/files';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import { Link } from '../../../components';


const Home: NextPage = () => {
  const { mutate: upload, isPending } = filesApi.useUpload();

  const onFileDrop = (files: FileWithPath[]) => {
    const [file] = files;

    const formData = new FormData();

    formData.append('file', file);

    upload(formData, {
      onSuccess: () => {
        showNotification({
          title: 'File uploaded',
          message: 'File uploaded successfully',
          color: 'green',
        })
      }
    });
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Stack gap="lg">
        <Title order={2}>Upload your files here</Title>

        <Dropzone
          onDrop={onFileDrop}
          disabled={isPending}
          maxFiles={1}
          style={{
            padding: 20,
            border: '2px dashed #666',
            borderRadius: 4,
            width: 400,
            height: 300,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            '&:hover': {
              background: 'red',
            },
          }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>

          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
            />
          </Dropzone.Reject>

          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>

            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Dropzone>

        <Link
          type={'router'}
          size={'md'}
          href={'/files'}
        >
          Back to files
        </Link>
      </Stack>
    </>
  );
};

export default Home;
