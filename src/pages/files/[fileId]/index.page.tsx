import Head from 'next/head';
import { NextPage } from 'next';
import { Group, Title, Stack, Box, Loader, Text, Image, Button } from '@mantine/core';
import { filesApi } from 'resources/files';
import { Link } from 'components';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';


const Home: NextPage = () => {
  const router = useRouter();

  const { fileId } = router.query;

  const { data: file, isLoading } = filesApi.useGetOne(fileId as string);
  const { mutate: deleteFile } = filesApi.useDelete(fileId as string);

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
        <Group>
          <Title order={2}>File information</Title>

          <Link
            type={'router'}
            size={'md'}
            href={RoutePath.Files}
          >
            Back to files
          </Link>

          <Link
            type={'router'}
            size={'md'}
            href={RoutePath.EditFile.replace(':fileId', file?._id as string)}
          >
            Edit file
          </Link>
        </Group>

        <Button onClick={() =>{
          deleteFile(undefined, {
            onSuccess: () => {
              router.push(RoutePath.Files);
            }
          });
        }}>
          Remove file
        </Button>

        <Image
          src={file?.url}
          width={200}
          style={{
            width: 200,
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />

        <Group>
          <Text style={{ fontWeight: 900 }}>File name</Text>
          <Text>{file?.originalname}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>File description</Text>
          <Text>{file?.description}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>File path</Text>
          <Text>{file?.path}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>File key</Text>
          <Text>{file?.key}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>File url</Text>
          <Link href={file?.url}>{file?.url}</Link>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>Views count</Text>
          <Text>{file?.views}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>File size</Text>
          <Text>{file?.size}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>File type</Text>
          <Text>{file?.mimetype}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>Uploaded at</Text>
          <Text>{file?.createdAt as unknown as string}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>Updated at</Text>
          <Text>{file?.updatedAt as unknown as string}</Text>
        </Group>

        <Group>
          <Text style={{ fontWeight: 900 }}>Last access</Text>
          <Text>{file?.lastAccess as unknown as string}</Text>
        </Group>
      </Stack>
    </>
  );
};

export default Home;
