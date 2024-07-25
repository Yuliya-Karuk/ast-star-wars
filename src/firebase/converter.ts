import { FavoriteItem } from '@/models';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export const favoriteItemConverter: FirestoreDataConverter<FavoriteItem[]> = {
  toFirestore(items: FavoriteItem[]): DocumentData {
    return {
      items: items.map(item => ({
        id: item.id,
      })),
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): FavoriteItem[] {
    const data: DocumentData = snapshot.data(options);
    return data.items.map((itemData: FavoriteItem) => ({
      id: itemData.id,
    }));
  },
};
