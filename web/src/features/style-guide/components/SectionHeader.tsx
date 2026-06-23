import React from 'react';

type SectionHeaderProps = {
  title: string;
  description?: string;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <header style={{ marginBottom: '24px' }}>
    <h2 className="text-xl-bold text-neutral-900 mb-8" style={{ margin: 0 }}>
      {title}
    </h2>
    {description && (
      <p className="text-m-regular text-neutral-700" style={{ margin: '8px 0 0 0' }}>
        {description}
      </p>
    )}
  </header>
);
