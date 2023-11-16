
function getBabelConfig() {
  if (process.env.NODE_ENV === 'test') {    // for Jest testing
    const targets = process.env.TARGETS ? process.env.TARGETS : 'defaults';
    const config = {
      presets: ['@babel/preset-env'],
      targets: targets,
    };
    console.log('Jest with babel configuration:', config);
    return config;
  } else {                 // for library building
    return {
      presets: ['@babel/preset-env'],
      targets: 'fully supports es5',
    };
  }
}

module.exports  = getBabelConfig();
