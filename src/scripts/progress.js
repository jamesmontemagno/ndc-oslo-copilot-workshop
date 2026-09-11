(() => {
  const storageKey = 'ndc-oslo-workshop-progress-v1';
  const taskStorageKey = 'ndc-oslo-workshop-task-progress-v1';
  const base = document.querySelector('meta[name="workshop-base"]')?.content || '/';
  const celebrationLessons = new Set(['vscode/05-complete', 'copilot-app/9-review']);
  const labs = {
    vscode: ['01-setup', '02-design', '03-quiz-master', '04-multi-agent', '05-complete'],
    'copilot-app': [
      '0-prerequisites',
      '1-install-copilot-app',
      '2-guided-tour',
      '3-add-star-rating',
      '4-custom-instructions',
      '5-build-filtering',
      '6-mcp-playwright',
      '7-agent-merge',
      '8-canvases',
      '9-review'
    ]
  };

  const parseState = (key) => {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  };

  const saveState = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const state = parseState(storageKey);
  const taskState = parseState(taskStorageKey);
  const normalizedPath = location.pathname.startsWith(base)
    ? location.pathname.slice(base.length)
    : location.pathname.replace(/^\/+/, '');
  const match = normalizedPath.match(/^labs\/([^/]+)\/([^/]+)\/?$/);

  const celebrate = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.className = 'workshop-confetti';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.append(canvas);

    const colors = ['#58a6ff', '#f778ba', '#ffd33d', '#56d364', '#bc8cff', '#ff7b72'];
    const particles = Array.from({ length: 240 }, (_, index) => ({
      x: index % 2 ? -20 : window.innerWidth + 20,
      y: window.innerHeight * (0.2 + Math.random() * 0.45),
      width: 6 + Math.random() * 8,
      height: 4 + Math.random() * 5,
      velocityX: (index % 2 ? 1 : -1) * (5 + Math.random() * 10),
      velocityY: -8 - Math.random() * 12,
      gravity: 0.28 + Math.random() * 0.15,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.35,
      color: colors[index % colors.length]
    }));
    let frame;
    let startedAt;

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = (timestamp) => {
      startedAt ??= timestamp;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += particle.gravity;
        particle.velocityX *= 0.992;
        particle.rotation += particle.rotationSpeed;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        context.fillRect(
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height
        );
        context.restore();
      });

      if (timestamp - startedAt < 5000) {
        frame = requestAnimationFrame(draw);
      } else {
        cleanup();
      }
    };

    const cleanup = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.remove();
    };

    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(draw);
  };

  const getLessonId = (href) => {
    const path = new URL(href, location.href).pathname;
    const relativePath = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\/+/, '');
    const lessonMatch = relativePath.match(/^labs\/([^/]+)\/([^/]+)\/?$/);
    if (!lessonMatch || !labs[lessonMatch[1]]?.includes(lessonMatch[2])) return null;
    return `${lessonMatch[1]}/${lessonMatch[2]}`;
  };

  const updateSidebar = () => {
    document.querySelectorAll('.sidebar-content a[href]').forEach((link) => {
      const id = getLessonId(link.href);
      if (!id) return;

      let indicator = link.querySelector('.lesson-complete-indicator');
      let label = link.querySelector('.lesson-complete-label');
      if (!indicator || !label) {
        indicator = document.createElement('span');
        label = document.createElement('span');
        indicator.className = 'lesson-complete-indicator';
        indicator.textContent = '✓';
        indicator.setAttribute('aria-hidden', 'true');
        label.className = 'lesson-complete-label';
        link.append(indicator, label);
      }

      const complete = Boolean(state[id]);
      link.dataset.lessonTracked = '';
      link.dataset.lessonComplete = String(complete);
      label.textContent = complete ? ' — completed' : '';
    });
  };

  const updateLanding = () => {
    let completed = 0;
    let total = 0;
    let resumeHref = `${base}labs/vscode/01-setup/`;
    let foundResume = false;

    Object.entries(labs).forEach(([lab, steps]) => {
      const done = steps.filter((step) => state[`${lab}/${step}`]).length;
      completed += done;
      total += steps.length;
      const meter = document.querySelector(`[data-lab-progress="${lab}"]`);
      if (meter) meter.style.transform = `scaleX(${done / steps.length})`;

      if (!foundResume) {
        const next = steps.find((step) => !state[`${lab}/${step}`]);
        if (next) {
          resumeHref = `${base}labs/${lab}/${next}/`;
          foundResume = true;
        }
      }
    });

    const summary = document.querySelector('[data-workshop-summary]');
    const resume = document.querySelector('[data-workshop-resume]');
    if (summary && completed > 0) {
      summary.textContent = `${completed} of ${total} steps complete. Your progress stays in this browser.`;
    }
    if (resume && completed > 0) {
      resume.href = resumeHref;
      resume.firstChild.textContent = completed === total ? 'Review the workshop ' : 'Resume workshop ';
    }
  };

  const initializeTabs = () => {
    document.querySelectorAll('[data-tabs]').forEach((tabs, groupIndex) => {
      const tabList = tabs.querySelector('[role="tablist"]');
      const tabButtons = [...tabs.querySelectorAll('[role="tab"][data-tab]')];
      const panels = [...tabs.querySelectorAll('[role="tabpanel"][data-panel]')];
      if (!tabList || !tabButtons.length || !panels.length) return;

      const panelByName = new Map(panels.map((panel) => [panel.dataset.panel, panel]));
      const setActiveTab = (name, moveFocus = false) => {
        const activeTab = tabButtons.find((tab) => tab.dataset.tab === name);
        const activePanel = panelByName.get(name);
        if (!activeTab || !activePanel) return;

        tabButtons.forEach((tab) => {
          const selected = tab === activeTab;
          tab.setAttribute('aria-selected', String(selected));
          tab.tabIndex = selected ? 0 : -1;
        });
        panels.forEach((panel) => {
          panel.hidden = panel !== activePanel;
        });
        if (moveFocus) activeTab.focus();
      };

      tabButtons.forEach((tab, tabIndex) => {
        const panel = panelByName.get(tab.dataset.tab);
        if (!panel) return;

        const tabId = `workshop-tab-${groupIndex}-${tabIndex}`;
        const panelId = `workshop-panel-${groupIndex}-${tabIndex}`;
        tab.id = tabId;
        tab.setAttribute('aria-controls', panelId);
        panel.id = panelId;
        panel.setAttribute('aria-labelledby', tabId);

        tab.addEventListener('click', () => setActiveTab(tab.dataset.tab));
        tab.addEventListener('keydown', (event) => {
          const currentIndex = tabButtons.indexOf(tab);
          let nextIndex = null;
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % tabButtons.length;
          } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
          } else if (event.key === 'Home') {
            nextIndex = 0;
          } else if (event.key === 'End') {
            nextIndex = tabButtons.length - 1;
          }

          if (nextIndex === null) return;
          event.preventDefault();
          setActiveTab(tabButtons[nextIndex].dataset.tab, true);
        });
      });

      const initiallySelected = tabButtons.find(
        (tab) => tab.getAttribute('aria-selected') === 'true'
      );
      setActiveTab(initiallySelected?.dataset.tab || tabButtons[0].dataset.tab);
    });
  };

  initializeTabs();

  document.querySelectorAll('.expressive-code pre').forEach((codeBlock) => {
    codeBlock.tabIndex = 0;
    if (!codeBlock.getAttribute('aria-label')) {
      codeBlock.setAttribute('aria-label', 'Scrollable code example');
    }
  });

  document
    .querySelectorAll('main .sl-markdown-content input[type="checkbox"]')
    .forEach((checkbox, index) => {
      const taskId = `${normalizedPath.replace(/\/+$/, '') || 'home'}#task-${index}`;
      const hasSavedState = Object.prototype.hasOwnProperty.call(taskState, taskId);
      const itemText = checkbox.closest('li')?.textContent?.replace(/\s+/g, ' ').trim();

      checkbox.disabled = false;
      checkbox.dataset.workshopTask = '';
      checkbox.checked = hasSavedState ? Boolean(taskState[taskId]) : checkbox.defaultChecked;
      checkbox.setAttribute(
        'aria-label',
        itemText ? `Complete task: ${itemText}` : `Complete task ${index + 1}`
      );

      checkbox.addEventListener('change', () => {
        taskState[taskId] = checkbox.checked;
        saveState(taskStorageKey, taskState);
      });
    });

  if (match && labs[match[1]]?.includes(match[2])) {
    const id = `${match[1]}/${match[2]}`;
    const container = document.querySelector('main .sl-markdown-content');
    if (container) {
      const wrapper = document.createElement('section');
      const status = document.createElement('p');
      const button = document.createElement('button');
      wrapper.className = 'lesson-progress';
      wrapper.setAttribute('aria-label', 'Lesson progress');
      status.setAttribute('aria-live', 'polite');
      button.type = 'button';

      const render = () => {
        const complete = Boolean(state[id]);
        status.textContent = complete
          ? 'This step is complete and saved in this browser.'
          : 'Mark this step complete when you are ready to move on.';
        button.textContent = complete ? 'Completed ✓' : 'Mark step complete';
        button.dataset.complete = String(complete);
        button.setAttribute('aria-pressed', String(complete));
      };

      button.addEventListener('click', () => {
        state[id] = !state[id];
        saveState(storageKey, state);
        render();
        updateSidebar();
        if (state[id] && celebrationLessons.has(id)) celebrate();
      });

      render();
      wrapper.append(status, button);
      container.append(wrapper);
    }

    if (celebrationLessons.has(id)) {
      window.setTimeout(celebrate, 250);
    }
  }

  updateSidebar();
  updateLanding();
})();
