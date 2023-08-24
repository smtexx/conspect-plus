import { AiOutlineSave } from 'react-icons/ai';
import s from './SaveIndicator.module.scss';
import { useSelector } from 'react-redux';
import { selectSaved } from '../../app/controller/redux/data/dataSlice';
import { Link } from 'react-router-dom';

export default function SaveIndicator() {
  const saved = useSelector(selectSaved);

  return (
    <Link
      className={`${s.wrapper} ${saved ? '' : s.active}`}
      to="/data"
      aria-label={
        saved ? 'Изменения сохранены' : 'Сохранить изменения'
      }
      title={saved ? 'Изменения сохранены' : 'Сохранить изменения'}
    >
      <AiOutlineSave />
    </Link>
  );
}
