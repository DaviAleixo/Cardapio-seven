import React from 'react';

interface SubcategoryHeadingProps {
  title: string;
}

const SubcategoryHeading: React.FC<SubcategoryHeadingProps> = ({ title }) => {
  return (
    <div className="mb-6 mt-8 first:mt-0">
      <div className="flex items-center">
        <h3 className="text-xl font-serif font-bold">{title}</h3>
        <div className="flex-1 ml-4 border-b border-gray-200"></div>
      </div>
    </div>
  );
};

export default SubcategoryHeading;