export interface IFile {
  readonly _id: string;
  readonly originalname: string;
  readonly filename: string;
  readonly size: number;
  readonly description: string;
  readonly key: string;
  readonly url: string;
  readonly mimetype: string;
  readonly path: string;
  readonly views: number;
  readonly extension: string;
  readonly private: boolean;
  readonly lastAccess: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}