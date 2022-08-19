This is an Online Shop project. The following tech stack is used:

JavaScript(ES6+)
React.js(Class components. Soon I'll upload a Functional Component version as a separate repository on GitHub)
HTML5, CSS3
Scss/Sass + CSS modules
Responsive design
Rest API(implemented using React Router)
State management(implemented using Redux)
Version control - git.
Design - figma.
A brief description of the Online Shop:

The data is fetched from local GraphQL server running on port 4000. Make sure to run the GraphQL server first by using and then launch the actual project. The project is ran on local host 3000 and the GraphQL server must be running on port 4000. (In case if graphql server is missing you can download it from here: https://github.com/scandiweb/junior-react-endpoint)
Follow these steps to start the GraphQL server:

1. Switch directory to the GraphQL server folder(the folder you unzipped the endpoint)
2. Download apollo client by: 
npm i @apollo/client
3. Run the build(For npm): 
npm run build
4. Start the server:
npm start
5. Then switch directory to the folder containing the React project and start it as well:
npm start
You're able:
To see the full product list
Filter the list based on the category selected
View a specific product separately
Modify the product attributes like: size, color & so on.
To add the product to your cart
To remove the product from the cart
To 'purchase' the product/products from the cart
And many more