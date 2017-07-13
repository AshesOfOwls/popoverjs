import './main.scss';

const defaults = {};

let render = null;

const getTriggerElement = () => (
  document.getElementsByClassName('trigger')[0]
);

const getPopoverElement = () => (
  document.getElementsByClassName('popoverjs')[0]
);

const destroyRenderListeners = () => {
  const target = getTriggerElement();
  target.removeEventListener('click', render);
};

const listenForRender = () => {
  const target = getTriggerElement();

  target.addEventListener('click', render);
};

const togglePopoverVisiblity = (isVisible = false) => {
  const popover = getPopoverElement();

  if (isVisible) {
    return popover.classList.add('is-visible');
  }

  return popover.classList.remove('is-visible');
};

const showPopover = () => {
  togglePopoverVisiblity(true);
};

const destroy = () => {
  destroyRenderListeners();
};

const main = () => {
  listenForRender();
};

render = () => {
  destroyRenderListeners();
  showPopover();
};

main(defaults);
