(function () {
  var $modal = document.querySelector('.sr-modal__overlay');
  var $iframe = document.getElementById('sr-modal');
  var $closeButton = document.querySelectorAll('.sr-modal__close-button')[0];
  var $modalButton = document.getElementById('show-modal');

  document.addEventListener('DOMContentLoaded', function() {
    $modalButton.addEventListener('click', function(event) {
      // show
      $modal.classList.add('sr-modal__overlay--show');

      setTimeout(function() {
          $iframe.contentWindow.focus();
      }, 0);

      /**
       *  Problem with keydown event + iframe:
       *    with iframe being last element in modal, there is no keydown event leaving iframe,
       *    at which point, the tab forces focus to leaves the modal into the main page dom on
       *    first focusable element on the page. its only after you tab again will the keydown event 
       *    be fired
       */
      document.addEventListener('keydown', function(e) {
        if (e.keyCode === 9) {
          if (document.activeElement === $closeButton) {
            console.log('[KEYDOWN EVENT]: ACTIVE ELEMENT IS THE CLOSE BUTTON');
            $iframe.contentWindow.focus();
            e.preventDefault();
          } else if (document.activeElement !== $iframe) {
            console.log('[KEYDOWN EVENT]: ACTIVE ELEMENT IS NOT THE IFRAME');
            $closeButton.focus();
            e.preventDefault();
          }
        }
      });

      /**
       * When does focusin fire:
       * TAB:
       * 1. fires when focus goes into the modal to the close button
       * 2. in modal it does not fire when moving from button to iframe
       * 3. does not fire inside of modal
       * 4. does not fire when leaving modal
       * 5. fires when it has left modal and back on the body of the main page
       * 
       * SHIFT+TAB:
       * 1. does not fire when inside of iframe
       * 2. fires when leaving iframe and lands on the close button
       * 
       * 
       * Focus in will only happen on modal when we enter the modal, at which point
       * the active element will be inside of the modal, so we are ok.
       * unlike focusout and keydown, focusin will be triggered when the iframe is the 
       * last element on the modal and the user tabs out of the iframe, which will technically
       * go to the next focusable element on the main page, but we stop that behavior and force it
       * to focus on the first focusable element on the modal
       */
      document.addEventListener('focusin', function(e) {
        console.log('[FOCUSIN EVENT]: event.target = ', e.target);
        console.log('[FOCUSIN EVENT]: document.activeElement = ', document.activeElement);
        // this check if focus has left the modal
        if (!$modal.contains(document.activeElement)) {
          console.log('[FOCUSIN EVENT]: modal does not contain document.activeElement', document.activeElement);
          // force to first focusable element in the modal
          e.preventDefault();
          $closeButton.focus();
        }
      });

      /**
       * The problem with focusout event:
       * when tabbing throgh modal, focusout event isnt fired when iframe is the last element
       * on the modal and when focus leaves the modal to the main page. You will only get
       * a focusout event after you tab again at that point
       */
      // document.addEventListener('focusout', function(e) {
      //   console.log('[FOCUSOUT EVENT]: event target = ', e.target);
      //   console.log('[FOCUSOUT EVENT]: document.activeElement = ', document.activeElement);
      // });
    });
  });

})();