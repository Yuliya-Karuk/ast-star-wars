import { FirebaseError } from 'firebase/app';
import { DefaultError, EmailAlreadyRegistered, UserCredentialError } from './constants';

export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

export const catchAuthErrors = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return UserCredentialError;
    case 'auth/email-already-in-use':
      return EmailAlreadyRegistered;
    default:
      return DefaultError;
  }
};
