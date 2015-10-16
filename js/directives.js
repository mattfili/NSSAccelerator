
/**
 * Wraps ng-cloak so that, instead of simply waiting for Angular to compile, it waits until
 * Auth resolves with the remote Firebase services.
 *
 * <code>
 *    <div ng-cloak>Authentication has resolved.</div>
 * </code>
 */
'use strict';

angular.module('valueprop').config(['$provide', function ($provide) {
  // adapt ng-cloak to wait for auth before it does its magic
  $provide.decorator('ngCloakDirective', ['$delegate', 'Auth', function ($delegate, Auth) {
    var directive = $delegate[0];
    // make a copy of the old directive
    var _compile = directive.compile;
    directive.compile = function (element, attr) {
      Auth.$waitForAuth().then(function () {
        // after auth, run the original ng-cloak directive
        _compile.call(directive, element, attr);
      });
    };
    // return the modified directive
    return $delegate;
  }]);
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9kaXJlY3RpdmVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FDeEIsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVMsUUFBUSxFQUFFOztBQUV0QyxVQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFDekQsVUFBUyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQ3hCLFFBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0IsUUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUNqQyxhQUFTLENBQUMsT0FBTyxHQUFHLFVBQVMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMxQyxVQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVc7O0FBRWxDLGdCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDekMsQ0FBQyxDQUFDO0tBQ0osQ0FBQzs7QUFFRixXQUFPLFNBQVMsQ0FBQztHQUNsQixDQUFDLENBQUMsQ0FBQztDQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImRpcmVjdGl2ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogV3JhcHMgbmctY2xvYWsgc28gdGhhdCwgaW5zdGVhZCBvZiBzaW1wbHkgd2FpdGluZyBmb3IgQW5ndWxhciB0byBjb21waWxlLCBpdCB3YWl0cyB1bnRpbFxuICogQXV0aCByZXNvbHZlcyB3aXRoIHRoZSByZW1vdGUgRmlyZWJhc2Ugc2VydmljZXMuXG4gKlxuICogPGNvZGU+XG4gKiAgICA8ZGl2IG5nLWNsb2FrPkF1dGhlbnRpY2F0aW9uIGhhcyByZXNvbHZlZC48L2Rpdj5cbiAqIDwvY29kZT5cbiAqL1xuYW5ndWxhci5tb2R1bGUoJ3ZhbHVlcHJvcCcpXG4gIC5jb25maWcoWyckcHJvdmlkZScsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gICAgLy8gYWRhcHQgbmctY2xvYWsgdG8gd2FpdCBmb3IgYXV0aCBiZWZvcmUgaXQgZG9lcyBpdHMgbWFnaWNcbiAgICAkcHJvdmlkZS5kZWNvcmF0b3IoJ25nQ2xvYWtEaXJlY3RpdmUnLCBbJyRkZWxlZ2F0ZScsICdBdXRoJyxcbiAgICAgIGZ1bmN0aW9uKCRkZWxlZ2F0ZSwgQXV0aCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0gJGRlbGVnYXRlWzBdO1xuICAgICAgICAvLyBtYWtlIGEgY29weSBvZiB0aGUgb2xkIGRpcmVjdGl2ZVxuICAgICAgICB2YXIgX2NvbXBpbGUgPSBkaXJlY3RpdmUuY29tcGlsZTtcbiAgICAgICAgZGlyZWN0aXZlLmNvbXBpbGUgPSBmdW5jdGlvbihlbGVtZW50LCBhdHRyKSB7XG4gICAgICAgICAgQXV0aC4kd2FpdEZvckF1dGgoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYWZ0ZXIgYXV0aCwgcnVuIHRoZSBvcmlnaW5hbCBuZy1jbG9hayBkaXJlY3RpdmVcbiAgICAgICAgICAgIF9jb21waWxlLmNhbGwoZGlyZWN0aXZlLCBlbGVtZW50LCBhdHRyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBtb2RpZmllZCBkaXJlY3RpdmVcbiAgICAgICAgcmV0dXJuICRkZWxlZ2F0ZTtcbiAgICAgIH1dKTtcbiAgfV0pOyJdfQ==
