const Scene = require('Scene')
const Patches = require('Patches')
const Animation = require('Animation')
const {log} = require('Diagnostics')

Promise.all([
  Scene.root.findFirst('Focal Distance'),
  Scene.root.findFirst('emitter0'),
]).then(([fd, emitter]) => {

  Patches.inputs.setPoint('fdPosition', fd.worldTransform.position)
  const alphaSampler = Animation.samplers.HSVA([
    Animation.samplers.constant(1),
    Animation.samplers.constant(1),
    Animation.samplers.constant(1),
    Animation.samplers.easeInQuad(1, 0)
  ])
  
  emitter.hsvaColorModulationModifier = alphaSampler
  emitter.sizeModifier = Animation.samplers.easeInQuad(0.007, 0)

}).catch(err => {
  log(err)
})