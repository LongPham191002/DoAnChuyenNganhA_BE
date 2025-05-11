export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
  role: string;
}

export class FirebaseUserDto {
  uid: string;
  email: string;
  name: string;
  picture: string;
}
