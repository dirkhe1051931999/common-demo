type EventNames = 'click' | 'scroll' | 'mousemove';
function Handle(ele: Element, event: EventNames): number {
  return 1;
}
Handle(document.getElementById('box'), 'click');
