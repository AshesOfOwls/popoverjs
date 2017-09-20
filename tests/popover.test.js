// import Positioner from '../src/positioner';
//
// let positionerInstance = null;
// let popoverElement = null;
// let triggerElement = null;
// let arrowElement = null;
// let contentElement = null;
// let constraintElement = null;
// const arrowSize = 8;
// const popoverHeight = 200;
// const popoverWidth = 100;
// const popoverHeightFull = popoverHeight + arrowSize;
// const popoverWidthFull = popoverWidth + arrowSize;
//
// const cleanup = () => {
//   if (positionerInstance) {
//     positionerInstance.destroy();
//     positionerInstance = null;
//   }
// };
//
// describe('Positioner', () => {
//   beforeEach(() => {
//     cleanup();
//
//     const fixture = `<div class='constraintParent'></div>
//                     <div class='trigger'></div>
//                     <div class='popoverjs'>
//                       <div class='popoverjs-arrow' style='height: ${arrowSize}px; width: 20px;'></div>
//                       <div class='popoverjs-content'></div>
//                     </div>`;
//
//     document.body.insertAdjacentHTML('afterbegin', fixture);
//
//     popoverElement = document.getElementsByClassName('popoverjs')[0];
//     triggerElement = document.getElementsByClassName('trigger')[0];
//   });
//
//   describe('when setting up', () => {
//     beforeEach(() => {
//       cleanup();
//
//       arrowElement = document.getElementsByClassName('popoverjs-arrow')[0];
//       contentElement = document.getElementsByClassName('popoverjs-content')[0];
//       constraintElement = document.getElementsByClassName('constraintParent')[0];
//     });
//
//     it('should retrieve the correct elements', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//         constraintParent: constraintElement,
//       });
//
//       expect(positionerInstance.triggerElement).toEqual(triggerElement);
//       expect(positionerInstance.popoverElement).toEqual(popoverElement);
//       expect(positionerInstance.popoverContent).toEqual(contentElement);
//       expect(positionerInstance.popoverArrow).toEqual(arrowElement);
//       expect(positionerInstance.constraintParent).toEqual(constraintElement);
//     });
//
//     it('should default to window constraint parent', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//         constraintParent: null,
//       });
//
//       expect(positionerInstance.constraintParent).toEqual(window);
//     });
//
//     it('should parse constraints', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//         constraints: [{
//           popover: 'top center',
//           trigger: 'bottom center',
//         }, {
//           popover: 'left top',
//           trigger: 'right bottom',
//         }, {
//           popover: 'bottom center',
//           trigger: 'top center',
//         }],
//       });
//
//       expect(positionerInstance.constraints).toEqual([{
//         popover: {
//           primary: 'top',
//           secondary: 'center',
//           string: 'top center',
//         },
//         trigger: {
//           primary: 'bottom',
//           secondary: 'center',
//           string: 'bottom center',
//         },
//       }, {
//         popover: {
//           primary: 'left',
//           secondary: 'top',
//           string: 'left top',
//         },
//         trigger: {
//           primary: 'right',
//           secondary: 'bottom',
//           string: 'right bottom',
//         },
//       }, {
//         popover: {
//           primary: 'bottom',
//           secondary: 'center',
//           string: 'bottom center',
//         },
//         trigger: {
//           primary: 'top',
//           secondary: 'center',
//           string: 'top center',
//         },
//       }]);
//     });
//
//     it('should determine the arrow size correctly', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//       });
//
//       positionerInstance.refreshParentOrigin();
//
//       expect(positionerInstance.cssCache.arrowSize).toEqual(8);
//     });
//
//     it('should retrieve the correct window origin', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//       });
//
//       const height = window.innerHeight;
//       const width = window.innerWidth;
//       const phantomWindowOrigin = {
//         bottom: height,
//         halfHeight: height / 2,
//         halfWidth: width / 2,
//         verticalCenter: height / 2,
//         horizontalCenter: width / 2,
//         height,
//         left: 0,
//         right: width,
//         top: 0,
//         width,
//       };
//
//       expect(positionerInstance.getWindowOrigin()).toEqual(phantomWindowOrigin);
//     });
//
//     it('should retrieve the correct element origin', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//       });
//
//       let origin = triggerElement.getBoundingClientRect();
//       origin = Object.assign(origin, {
//         halfHeight: origin.height / 2,
//         halfWidth: origin.width / 2,
//         horizontalCenter: origin.left + (origin.width / 2),
//         verticalCenter: origin.top + (origin.height / 2),
//       });
//
//       expect(positionerInstance.getElementOrigin(triggerElement)).toEqual(origin);
//     });
//
//     it('should return formatted origins when using setHalfPointsOnOrigin', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//       });
//
//       const origin = {
//         bottom: 500,
//         left: 0,
//         height: 500,
//         right: 500,
//         top: 0,
//         width: 500,
//       };
//
//       const originModified = Object.assign(origin, {
//         halfHeight: 250,
//         halfWidth: 250,
//         verticalCenter: 250,
//         horizontalCenter: 250,
//       });
//
//       expect(positionerInstance.setHalfPointsOnOrigin(origin)).toEqual(originModified);
//     });
//   });
//
//   describe('when testing constraints', () => {
//     beforeEach(() => {
//       cleanup();
//
//       const fixture = `<div class='constraintParent'></div>
//                       <div class='trigger' style='height: 50px; width: 50px;'></div>
//                       <div class='popoverjs'>
//                         <div class='popoverjs-arrow' style='height: ${arrowSize}px; width: 20px;'></div>
//                         <div class='popoverjs-content'>
//                           <div class='inner-content' style='height: ${popoverHeight}px; width: ${popoverWidth}px;'></div>
//                         </div>
//                       </div>`;
//
//       document.body.insertAdjacentHTML('afterbegin', fixture);
//     });
//
//     it('should receive the correct classes from the active constraint', () => {
//       positionerInstance = new Positioner({
//         popoverElement,
//         triggerElement,
//       });
//
//       positionerInstance.activeConstraint = {
//         popover: { primary: 'top', secondary: 'left' },
//         trigger: { primary: 'right', secondary: 'bottom' },
//       };
//
//       const activeClasses = positionerInstance.getActiveConstraintClasses();
//
//       expect(activeClasses).toEqual([
//         'popoverjs--popover-primary-top',
//         'popoverjs--popover-secondary-left',
//         'popoverjs--trigger-primary-right',
//         'popoverjs--trigger-secondary-bottom',
//       ]);
//     });
//
//     describe('when testing constrainment', () => {
//       beforeEach(() => {
//         cleanup();
//
//         positionerInstance = new Positioner({
//           popoverElement,
//           triggerElement,
//         });
//
//         positionerInstance.arrowSize = arrowSize;
//
//         positionerInstance.origins.parent = {
//           height: 1000,
//           width: 1000,
//           left: 0,
//           right: 1000,
//           top: 0,
//           bottom: 1000,
//         };
//
//         positionerInstance.origins.trigger = {
//           height: 50,
//           width: 50,
//           left: 200,
//           right: 250,
//           top: 200,
//           bottom: 250,
//         };
//
//         positionerInstance.origins.popover = {
//           height: popoverHeight,
//           width: popoverWidth,
//         };
//       });
//
//       it('getPopoverSizeFromSide returns correct dimension value', () => {
//         const cssCache = {
//           arrowSize: 10,
//         };
//
//         const popover = {
//           height: 100,
//           width: 200,
//         };
//
//         positionerInstance.cssCache = cssCache;
//         positionerInstance.origins.popover = popover;
//
//         expect(positionerInstance.getPopoverSizeFromSide('left')).toBe(popover.width + cssCache.arrowSize);
//         expect(positionerInstance.getPopoverSizeFromSide('top')).toBe(popover.height + cssCache.arrowSize);
//         expect(positionerInstance.getPopoverSizeFromSide('right')).toBe(popover.width + cssCache.arrowSize);
//         expect(positionerInstance.getPopoverSizeFromSide('bottom')).toBe(popover.height + cssCache.arrowSize);
//       });
//
//       it('isConstrainedByPrimary returns TRUE if OUTSIDE of each side', () => {
//         const parentOrigin = positionerInstance.origins.parent;
//
//         positionerInstance.origins.trigger.left = popoverWidthFull - 1;
//         expect(positionerInstance.isConstrainedByPrimary('left')).toBe(true);
//
//         positionerInstance.origins.trigger.top = popoverHeightFull - 1;
//         expect(positionerInstance.isConstrainedByPrimary('top')).toBe(true);
//
//         positionerInstance.origins.trigger.right = parentOrigin.right - popoverWidthFull + 1;
//         expect(positionerInstance.isConstrainedByPrimary('right')).toBe(true);
//
//         positionerInstance.origins.trigger.bottom = parentOrigin.bottom - popoverHeightFull + 1;
//         expect(positionerInstance.isConstrainedByPrimary('bottom')).toBe(true);
//       });
//
//       it('isConstrainedByPrimary returns FALSE if EQUAL distance to each side', () => {
//         const parentOrigin = positionerInstance.origins.parent;
//
//         positionerInstance.origins.trigger.left = popoverWidthFull;
//         expect(positionerInstance.isConstrainedByPrimary('left')).toBe(false);
//
//         positionerInstance.origins.trigger.top = popoverHeightFull;
//         expect(positionerInstance.isConstrainedByPrimary('top')).toBe(false);
//
//         positionerInstance.origins.trigger.right = parentOrigin.right - popoverWidthFull;
//         expect(positionerInstance.isConstrainedByPrimary('right')).toBe(false);
//
//         positionerInstance.origins.trigger.bottom = parentOrigin.bottom - popoverHeightFull;
//         expect(positionerInstance.isConstrainedByPrimary('bottom')).toBe(false);
//       });
//
//       it('isConstrainedByPrimary returns FALSE if INSIDE of each side', () => {
//         const parentOrigin = positionerInstance.origins.parent;
//
//         positionerInstance.origins.trigger.left = popoverWidthFull + 1;
//         expect(positionerInstance.isConstrainedByPrimary('left')).toBe(false);
//
//         positionerInstance.origins.trigger.top = popoverHeightFull + 1;
//         expect(positionerInstance.isConstrainedByPrimary('top')).toBe(false);
//
//         positionerInstance.origins.trigger.right = parentOrigin.right - popoverWidthFull - 1;
//         expect(positionerInstance.isConstrainedByPrimary('right')).toBe(false);
//
//         positionerInstance.origins.trigger.bottom = parentOrigin.bottom - popoverHeightFull - 1;
//         expect(positionerInstance.isConstrainedByPrimary('bottom')).toBe(false);
//       });
//
//       it('getOriginPointForConstraint returns the correct offset amount', () => {
//         const trigger = {
//           left: 10,
//           top: 10,
//           right: 110,
//           bottom: 110,
//           height: 100,
//           halfHeight: 50,
//           halfWidth: 50,
//           width: 100,
//         };
//
//         const cssCache = {
//           popoverOffset: 15,
//           triggerOffset: 25,
//         };
//
//         positionerInstance.origins.trigger = trigger;
//         positionerInstance.cssCache = cssCache;
//
//         expect(positionerInstance.getOriginPointForConstraint({
//           trigger: { primary: 'top', secondary: 'center' }
//         })).toBe(trigger.left + trigger.halfWidth);
//
//         expect(positionerInstance.getOriginPointForConstraint({
//           trigger: { primary: 'top', secondary: 'left' }
//         })).toBe(trigger.left + cssCache.triggerOffset);
//
//         expect(positionerInstance.getOriginPointForConstraint({
//           trigger: { primary: 'top', secondary: 'right' }
//         })).toBe(trigger.right - cssCache.triggerOffset);
//
//         expect(positionerInstance.getOriginPointForConstraint({
//           trigger: { primary: 'left', secondary: 'center' }
//         })).toBe(trigger.top + trigger.halfHeight);
//
//         expect(positionerInstance.getOriginPointForConstraint({
//           trigger: { primary: 'left', secondary: 'top' }
//         })).toBe(trigger.top + cssCache.triggerOffset);
//
//         expect(positionerInstance.getOriginPointForConstraint({
//           trigger: { primary: 'left', secondary: 'bottom' }
//         })).toBe(trigger.bottom - cssCache.triggerOffset);
//       });
//
//       it('getPopoverSizeOnConstraintSide returns the correct popover size for constraint/side', () => {
//         const cssCache = {
//           popoverOffset: 28,
//         };
//
//         const popover = {
//           height: 100,
//           width: 200,
//           halfHeight: 50,
//           halfWidth: 100,
//         };
//
//         positionerInstance.origins.popover = popover;
//         positionerInstance.cssCache = cssCache;
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'left', secondary: 'center' }
//         }, 'top')).toBe(popover.halfHeight);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'top', secondary: 'center' }
//         }, 'left')).toBe(popover.halfWidth);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'top', secondary: 'right' }
//         }, 'left')).toBe(popover.width - cssCache.popoverOffset);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'top', secondary: 'right' }
//         }, 'right')).toBe(cssCache.popoverOffset);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'top', secondary: 'left' }
//         }, 'right')).toBe(popover.width - cssCache.popoverOffset);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'top', secondary: 'left' }
//         }, 'left')).toBe(cssCache.popoverOffset);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'left', secondary: 'top' }
//         }, 'top')).toBe(cssCache.popoverOffset);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'left', secondary: 'top' }
//         }, 'bottom')).toBe(popover.height - cssCache.popoverOffset);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'left', secondary: 'bottom' }
//         }, 'bottom')).toBe(cssCache.popoverOffset);
//
//         expect(positionerInstance.getPopoverSizeOnConstraintSide({
//           popover: { primary: 'left', secondary: 'bottom' }
//         }, 'top')).toBe(popover.height - cssCache.popoverOffset);
//       });
//     });
//   });
// });
