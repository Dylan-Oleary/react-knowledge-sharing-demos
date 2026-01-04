import { useState, useEffect, useCallback } from "react";
import { topics } from "./slides.tsx";
import CodeBlock from "./CodeBlock.tsx";
import "./App.css";

function App() {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);

  const topic = topics[currentTopicIndex];
  const detailSlide = topic.detailSlides[currentDetailIndex];

  const goToNextDetail = useCallback(() => {
    if (currentDetailIndex < topic.detailSlides.length - 1) {
      setCurrentDetailIndex((idx) => idx + 1);
    }
  }, [currentDetailIndex, topic.detailSlides.length]);

  const goToPreviousDetail = useCallback(() => {
    if (currentDetailIndex > 0) {
      setCurrentDetailIndex((idx) => idx - 1);
    }
  }, [currentDetailIndex]);

  const goToTopic = (topicIdx: number) => {
    setCurrentTopicIndex(topicIdx);
    setCurrentDetailIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goToNextDetail();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goToPreviousDetail();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextDetail, goToPreviousDetail]);

  const hasDetails = topic.detailSlides.length > 0;

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>React: Under the Hood</h2>
        </div>
        <nav className="sidebar-nav">
          {topics.map((t, index) => (
            <button
              key={t.id}
              className={`sidebar-item ${
                index === currentTopicIndex ? "active" : ""
              } ${t.isTitle ? "title-item" : ""}`}
              onClick={() => goToTopic(index)}
            >
              {t.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        {topic.isTitle ? (
          <div className="title-slide">
            <h1 className="main-title">{topic.title}</h1>
            <p className="main-subtitle">{topic.summary}</p>
          </div>
        ) : (
          <div className="content-slide">
            <div className="slide-header">
              <h1>{topic.title}</h1>
              {hasDetails && (
                <div className="slide-counter">
                  {currentDetailIndex + 1} / {topic.detailSlides.length}
                </div>
              )}
            </div>

            {hasDetails && detailSlide ? (
              <div className="slide-body">
                {detailSlide.summary && (
                  <div className="slide-summary-box">
                    <p>{detailSlide.summary}</p>
                  </div>
                )}

                {detailSlide.content.length === 0 ? (
                  <div className="slide-full-width">
                    {detailSlide.rightSide?.map((extra, index) => (
                      <div key={index} className="slide-extra-item">
                        {extra}
                      </div>
                    ))}

                    {detailSlide.code && <CodeBlock code={detailSlide.code} />}
                  </div>
                ) : (
                  <div className="slide-content-columns">
                    <div className="slide-content-left">
                      <ul className="slide-list">
                        {detailSlide.content.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="slide-content-right">
                      {detailSlide.rightSide?.map((extra, index) => (
                        <div key={index} className="slide-extra-item">
                          {extra}
                        </div>
                      ))}

                      {detailSlide.code && (
                        <CodeBlock code={detailSlide.code} />
                      )}
                    </div>
                  </div>
                )}

                {detailSlide.notes && (
                  <div className="notes">
                    <strong>💡 Note:</strong> {detailSlide.notes}
                  </div>
                )}

                <div className="slide-navigation">
                  <button
                    onClick={goToPreviousDetail}
                    disabled={currentDetailIndex === 0}
                    className="nav-btn"
                  >
                    ← Previous
                  </button>
                  <div className="nav-dots">
                    {topic.detailSlides.map((_, idx) => (
                      <button
                        key={idx}
                        className={`nav-dot ${
                          idx === currentDetailIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentDetailIndex(idx)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={goToNextDetail}
                    disabled={
                      currentDetailIndex === topic.detailSlides.length - 1
                    }
                    className="nav-btn"
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              <div className="slide-body">
                {topic.summary && <p>{topic.summary}</p>}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
