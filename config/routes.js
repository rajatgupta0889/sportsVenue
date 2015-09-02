/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  'post /create' : 'GroundController.createGround',
  '/searchAdvance' : 'GroundController.groundSearchAdvance',
  '/textSearch' : 'GroundController.groundSearch',

  'post /createReview' : 'ReviewController.createReview',
  'get /userReviews/:userId': 'ReviewController.listOfReviewsByUser',
  'get /groundReviews/:groundId': 'ReviewController.listOfReviewsOfGround',
  'delete /review/:reviewId': 'ReviewController.deleteReview',
  'get /reviews' : 'ReviewController.listReviews',

  'post /loginUser' : 'UserController.login',
  'post /signUpUser' : 'UserController.signUp',
  'post /signupfb' : 'UserController.fbSignUp',
  'post /facebookSignIn' : 'UserController.fbSignIn',

  'patch /update/:groundId' : 'GroundController.updateGround',
  'get /grounds' : 'GroundController.listGrounds',
  'get /ground/:groundId' : 'GroundController.singleGround',
  'delete /ground/:groundId' : 'GroundController.deleteGround',

  'get /users' : 'UserController.list',
  'get /user/:userId' : 'UserController.singleUser',
  'delete /user/:userId' : 'UserController.deleteUser',
  'patch /user/:userId' : 'UserController.updateUser',

  'get /created_grounds/:userId' : 'GroundController.getCreatedGrounds',

  '/logout' : 'UserController.userLogout',

  '/home' : 'UserController.showHomePage',

  '/' : 'UserController.showHomePage',

  '/postsignup' : 'UserController.postSignUp',

  'post /passwordreset' : 'UserController.resetPassword',

  'post /send_feedback' : 'UserController.sendFeedbackMailToAdmin',

  '/admin':{
    view:'admin/adminHome'
  },

  '/createGround':{
    view : 'create_ground'
  },

  '/contact_us':{
    view : 'contact_us'
  },

  '/add/data': {
    view: 'Image/new'
  },

  // Added by Anup
  'POST /create':'AppController.create',
  'GET /index':'AppController.index',
  'POST App/destroy':'AppController.destroy',
  'GET /data':'DataController.GetComponentList'

  // '/': {
  //   view: 'index'
  // },
  
  // '/home': {
  //   view: 'index'
  // },

  // '/ground_details': {
  //   view: 'ground_details'
  // },

  // '/postsignup': {
  //   view: 'post_signup'
  // }

  // '/': {
  //   view: 'homepage'
  // }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
