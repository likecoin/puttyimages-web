from fabric.api import env, settings
from fabric.decorators import task
from fabric.operations import local, put, run

env.shell = '/bin/sh -l -c'
# The env.user and roledefs is only useful when the script is doing a remote
# execution via ssh. The user will be the user uesed to login to ssh, and the
# roledes is the mapping on the enviromnet to the remote machine.
env.user = 'unimportant'
env.roledefs.update({
    'pandawork': ['puttyimages.pandawork.com']
})

def short_sha():
    return local("git rev-parse --short HEAD", capture=True)

@task
def deploy(branch_name):
    image_tag = short_sha()
    local("kubectl --namespace likecoin set image deployment/puttyimages-web web=oursky/puttyimages-web:%s" % (image_tag,))
