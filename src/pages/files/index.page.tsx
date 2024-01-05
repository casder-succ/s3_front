import Head from 'next/head';
import { NextPage } from 'next';
import { Group, Title, Stack, Box, Loader, Button } from '@mantine/core';
import { filesApi } from '../../resources/files';
import { IFile } from '../../resources/files/files.types';
import { Link } from '../../components';
import { RoutePath } from '../../routes';
import { Icon3dCubeSphere } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';

const Home: NextPage = () => {
  const { data, isLoading } = filesApi.useList();

  if (isLoading) {
    return (
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Loader/>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Stack gap="lg">
        <Title order={2}>Files</Title>

        <Stack gap={'md'}>
          {data?.map((file: IFile) => (
            <Link
              key={file._id}
              type={'router'}
              size={'md'}
              href={RoutePath.FileDetails.replace(':fileId', file._id)}
            >
              {file.originalname}
            </Link>
          ))}
        </Stack>

        <Box style={{ marginTop: 200, }}>
          <Link
            type={'router'}
            size={'md'}
            icon={<Icon3dCubeSphere/>}
            href={RoutePath.NewFile}
          >
            Add new file
          </Link>
        </Box>
      </Stack>
    </>
  );
};

export default Home;
