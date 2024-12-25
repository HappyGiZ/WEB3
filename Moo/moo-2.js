(async () => {
  const clicksCount = parseInt(prompt("Сколько раз жмать?"), 10);

  if (isNaN(clicksCount) || clicksCount <= 0) {
    alert("Введите корректное число кликов.");
    return;
  }

  const defaultMinDelay = 200;
  const defaultMaxDelay = 600;

  const minDelay = parseInt(prompt(`Минимальная задержка между кликами (в мс, по умолчанию ${defaultMinDelay}):`, defaultMinDelay), 10);
  const maxDelay = parseInt(prompt(`Максимальная задержку между кликами (в мс, по умолчанию ${defaultMaxDelay}):`, defaultMaxDelay), 10);

  if (isNaN(minDelay) || isNaN(maxDelay) || minDelay < 0 || maxDelay < minDelay) {
    alert("Введите корректные значения задержки.");
    return;
  }

  const canvas = document.querySelector('canvas');
  if (!canvas) {
    alert("Бычара не обнаружен.");
    return;
  }

  const rect = canvas.getBoundingClientRect();

  const safeXStart = rect.left + rect.width / 4;
  const safeXEnd = rect.right - rect.width / 4;
  const safeYStart = rect.top + rect.height / 4;
  const safeYEnd = rect.bottom - rect.height / 4;

  let currentX = Math.random() * (safeXEnd - safeXStart) + safeXStart;
  let currentY = Math.random() * (safeYEnd - safeYStart) + safeYStart;

  for (let i = 0; i < clicksCount; i++) {
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: currentX,
      clientY: currentY,
    });

    canvas.dispatchEvent(clickEvent);

    console.log(`Клик ${i + 1} / ${clicksCount}`);

    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    await new Promise(resolve => setTimeout(resolve, delay));

    currentX = Math.min(safeXEnd, Math.max(safeXStart, currentX + (Math.random() * 20 - 10)));
    currentY = Math.min(safeYEnd, Math.max(safeYStart, currentY + (Math.random() * 20 - 10)));
  }

  alert("Прокликано");
})();