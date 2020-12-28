import React from 'react';
import clsx from 'clsx';

interface SurveyProgressProps {
  currentIndex: number;
  totalCount: number;
}

/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    item: {
      backgroundColor: '#ccc',
      margin: 3,
      height: "100%",
      flexGrow: 1,
      maxWidth: 40,
    },
  }),
);*/

const SurveyProgress: React.FC<SurveyProgressProps> = (props) => {
  return (

    <div
      className="d-flex w-100 align-items-center justify-content-center"
      style={{ height: 5 }}
    >
      {
        Array.from(Array(props.totalCount).keys()).map(
          index => (
            <div
              key={index.toString()}
              className={
                clsx(
                  'h-100',
                  'flex-grow-1',
                  {
                    'bg-grey-2': index > props.currentIndex,
                    'bg-primary': index <= props.currentIndex,
                  })}
              style={{ margin: 3, maxWidth: 40 }}
            >
            </div>
          )
        )
      }
    </div>


  );
};

export default SurveyProgress;
