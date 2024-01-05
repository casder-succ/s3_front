import { useMutation, useQuery } from '@tanstack/react-query';
import { apiService } from '../../services';
import { IFile } from './files.types';
import queryClient from '../../query-client';

export const useList = () => {
  return useQuery({
    queryKey: ['files'],
    queryFn: () => apiService.get('/files'),
  });
}

export const useUpload = () => {
  return useMutation({
    mutationFn: (fileData: FormData) => apiService.post('/files', fileData),
  });
}

export const useGetOne = (id: string) => {
  return useQuery<IFile>({
    queryKey: ['files', id],
    queryFn: () => apiService.get(`/files/${id}`),
  });
}

export const useUpdate = (id: string) => {
  return useMutation({
    mutationFn: (fileData: any) => apiService.put(`/files/${id}`, fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
      });
    }
  });
}

export const useDelete = (id: string) => {
  return useMutation({
    mutationFn: () => apiService.delete(`/files/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
      });
    }
  });
}