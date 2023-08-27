import { AiOutlineSave } from 'react-icons/ai';
import s from './SaveIndicator.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSaved,
  writeAppState,
} from '../../app/controller/redux/app/appSlice';
import { AppDispatch } from '../../app/controller/redux/store';

export default function SaveIndicator() {
  const saved = useSelector(selectSaved);
  const dispatch = useDispatch() as AppDispatch;

  const handleSaveData = () => {
    dispatch(writeAppState());
  };

  return (
    <button
      className={`${s.wrapper} ${saved ? '' : s.active}`}
      disabled={saved}
      onClick={handleSaveData}
      aria-label={
        saved ? 'Изменения сохранены' : 'Сохранить изменения'
      }
      title={saved ? 'Изменения сохранены' : 'Сохранить изменения'}
    >
      <AiOutlineSave />
    </button>
  );
}
