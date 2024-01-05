import Head from 'next/head';
import { NextPage } from 'next';
import { Group, Title, Stack, Box, Loader, Image, Input, Checkbox, Button } from '@mantine/core';
import { filesApi } from 'resources/files';
import { showNotification } from '@mantine/notifications';
import { Link } from 'components';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const schema = z.object({
  originalname: z.string(),
  description: z.string(),
  private: z.boolean(),
});
type FormValues = z.infer<typeof schema>;

const Home: NextPage = () => {
  const router = useRouter();
  const { fileId } = router.query;

  const {data: file, isLoading} = filesApi.useGetOne(fileId as string);
  const { mutate: update, isPending } = filesApi.useUpdate(fileId as string);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      originalname: file?.originalname.split('.').slice(0, -1).join('.'),
      description: file?.description,
      private: file?.private,
    }
  })

  const onSubmit = (values: FormValues) => {
    update(values, {
      onSuccess: () => {
        showNotification({
          title: 'File updated',
          message: 'File updated successfully',
          color: 'green',
        })
      }
    });
  }

  useEffect(() => {
    setValue('originalname', file?.originalname.split('.').slice(0, -1).join('.') as string);
    setValue('description', file?.description as string);
    setValue('private', file?.private as boolean);
  }, [file]);

  if (isLoading || !file) {
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
          <Title order={2}>Update your file information</Title>

          <Link
            type={'router'}
            size={'md'}
            href={RoutePath.Files}
          >
            Back to files
          </Link>
        </Group>

        <Image
          src={file?.url}
          width={200}
          style={{
            width: 200,
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Input
              {...register('originalname')}
              defaultValue={file?.originalname.split('.').slice(0, -1).join('.')}
              placeholder={'File name'}
              disabled={isPending}
            />

            <Input
              {...register('description')}
              defaultValue={file?.description}
              placeholder={'File description'}
              disabled={isPending}
            />

            <Checkbox
              {...register('private')}
              defaultChecked={file?.private}
              label={'Private'}
              disabled={isPending}
            />

            <Button
              type={'submit'}
              loading={isPending}
              disabled={isPending}
            >
              Update file
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default Home;
