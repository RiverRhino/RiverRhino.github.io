from pytubefix import YouTube
from pytubefix.cli import on_progress
from tkinter import *

#descarga de audios
#url = "https://www.youtube.com/watch?v=yrYBsXOns3E"

#yt = YouTube(url, on_progress_callback=on_progress)
#print(yt.title)

#ys = yt.streams.get_audio_only()
#ys.download()
#print(ys.download())


#Descarga de videos de youtube
url = "https://youtu.be/C4o8X3-BvcQ?si=_1-MBJYblOL4UKsj"

yt = YouTube(url, on_progress_callback=on_progress)
print(yt.title)

ys = yt.streams.get_highest_resolution()
ys.download()
print(ys.download)