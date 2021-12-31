import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = (prop: CoursePart) => {
  const part = () => {
    switch (prop.type) {
      case 'normal':
        return (
          <div>
            <em>{prop.description}</em>
          </div>
        );
      case 'groupProject':
        return <div>project exercises {prop.groupProjectCount}</div>;
      case 'submission':
        return (
          <div>
            <em>{prop.description}</em>
            <div>{prop.exerciseSubmissionLink}</div>
          </div>
        );
      case 'special':
        return (
          <div>
            <em>{prop.description}</em>
            <div>
              required skills: {prop.requirements.map((rqmt) => (
                <span key={rqmt}>{rqmt} </span>
              ))}
            </div>
          </div>
        );
      default:
        return assertNever(prop);
    }
  };
  return (
    <div>
      <h4>
        {prop.name} {prop.exerciseCount}
      </h4>
      {part()}
    </div>
  );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  );
};

export default Content;
