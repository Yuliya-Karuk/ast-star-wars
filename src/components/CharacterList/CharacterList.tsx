import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { Loader } from '@components/Loader/Loader';
import { APIResponse } from '@models/index';
import { useEffect, useState } from 'react';
import { api } from 'src/services';
import s from './CharacterList.module.scss';

export const CharacterList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<APIResponse>({} as APIResponse);

  useEffect(() => {
    const getData = async () => {
      const result = await api.getPeople();
      setData(result);
      setIsLoading(false);
    };

    getData();
  }, []);

  const renderCharacterCards = () => {
    if (isLoading) {
      return <Loader />;
    }

    return data.results.length > 0 ? (
      <div className={s.mainContainer}>
        {data.results.map(character => (
          <CharacterItem key={character.name} character={character} />
        ))}
      </div>
    ) : (
      <div className={s.emptySearch}>Sorry, we couldn`t find anything matching your search.</div>
    );
  };

  return <main className={s.main}>{renderCharacterCards()}</main>;
};
