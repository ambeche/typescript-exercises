import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Part = ({
  name,
  exerciseCount,
}: CoursePart) => (
  <p>
    {name} {exerciseCount}
  </p>
);

const Content = ({ courseParts }: {courseParts: CoursePart[]}) => {
  return (
    <div>
      {
        courseParts.map(part => {
          const {name, exerciseCount} = part;
          return (
            <Part key={name} name={name} exerciseCount={exerciseCount} />
          )
        })
      }
    </div>
  )
};

export default Content;
