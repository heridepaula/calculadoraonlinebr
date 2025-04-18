import MonthlyResult from './MonthlyResult';

interface ReinvestedProps {
  monthlyResults: MonthlyResult[];
  setMonthlyResults: React.Dispatch<React.SetStateAction<MonthlyResult[]>>;
}

export default ReinvestedProps;
