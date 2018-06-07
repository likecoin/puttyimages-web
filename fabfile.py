from fabric.api import env, settings
from fabric.decorators import task
from fabric.operations import local, put, run

env.shell = '/bin/sh -l -c'
env.user = 'unimportant'
env.roledefs.update({
    'pandawork': ['puttyimage.pandawork.com'] # this is also unimportant
})

def short_sha():
    return local("git rev-parse --short HEAD", capture=True)

@task
def deploy(branch_name):
    image_tag = short_sha()
    local("kubectl --namespace likecoin set image deployment/puttyimage-web web=oursky/puttyimage-web:%s" % (image_tag,))
