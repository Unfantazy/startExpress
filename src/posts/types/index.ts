import { ObjectId } from "mongodb";

export type IPostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};

export type IPostDbModel = {
  _id: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export type IPostViewModel = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};
