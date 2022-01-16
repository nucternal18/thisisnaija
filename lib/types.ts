export type User = {
  _id: string;
  image: string;
  userName: string;
  _rev: string;
  _type: string;
  _createdAt: Date;
  _updatedAt: Date;
};

export type UserInfoProps = {
  googleId: string;
  name: string;
  email: string;
  imageUrl: string;
  familyName: string;
  givenName: string;
}

export type PostedBy = {
  _id: string;
  userName: string;
  image: string;
};

export type PinDetails = {
  about: string;
  category: string;
  comments: any;
  destination: string;
  image: {
    asset: {
      url: string;
    }
  }
  postedBy: PostedBy;
  _id: string;
  save: Array<PostedBy>
  title: string;
}
