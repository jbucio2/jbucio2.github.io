(function () {
  var $modal = document.querySelector('.sr-modal__overlay');
  var $iframe = document.getElementById('sr-modal');
  var $firstButton = document.querySelectorAll('.sr-modal__close-button')[0];
  var $lastButton = document.querySelectorAll('.sr-modal__last-button')[0];
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
       *  with iframe being last element in modal, there is no keydown event leaving iframe,
       *  at which point, the tab forces focus to leaves the modal into the main page dom on
       *  first focusable element on the page. its only after you tab again will the keydown event 
       *  be fired. To avoid this problem we place a tabbable/focusable element before and after
       *  the iframe.
       */
      document.addEventListener('keydown', function(e) {
        if (e.keyCode === 9) {
          if (!$modal.contains(document.activeElement)) {
            $firstButton.focus()
          } else {
            if (e.shiftKey && document.activeElement === $firstButton) {
              $lastButton.focus()
              e.preventDefault()
            }

            if (!e.shiftKey && document.activeElement === $lastButton) {
              $firstButton.focus()
              e.preventDefault()
            }
          }          
        }
      });
    });
  });

})();