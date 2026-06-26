import React, { memo, useState, useCallback } from 'react';
import { FAQS } from '../../data/siteData';
import { ChevronDownIcon } from '../../assets/icons';
import './FAQ.css';

interface FAQItemProps {
  item: typeof FAQS[number];
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = memo(({ item, isOpen, onToggle }) => {
  return (
    <div className={`faq__item ${isOpen ? 'is-open' : ''}`}>
      <h3>
        <button
          type="button"
          className="faq__trigger"
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${item.id}`}
          id={`faq-trigger-${item.id}`}
          onClick={onToggle}
        >
          {item.question}
          <span className="faq__icon" aria-hidden="true">
            <ChevronDownIcon size={20} />
          </span>
        </button>
      </h3>
      <div
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${item.id}`}
        className="faq__panel"
        aria-hidden={!isOpen}
      >
        <div className="faq__panel-inner">
          <p className="faq__answer">{item.answer}</p>
        </div>
      </div>
    </div>
  );
});
FAQItem.displayName = 'FAQItem';

import Reveal from '../Reveal/Reveal';

const FAQ: React.FC = memo(() => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section id="faq" className="faq" aria-labelledby="faq-heading">
      <div className="container faq__container">
        <Reveal direction="up">
          <div className="faq__header">
            <span className="faq__badge">Common Questions</span>
            <h2 id="faq-heading" className="faq__title">
              Everything you need to know.
            </h2>
          </div>
        </Reveal>

        <div className="faq__list" role="list" aria-label="Frequently asked questions">
          {FAQS.map((item, index) => (
            <Reveal key={item.id} delay={index * 100} direction="up">
              <FAQItem
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
});
FAQ.displayName = 'FAQ';

export default FAQ;
