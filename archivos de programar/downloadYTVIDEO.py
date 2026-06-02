from pytubefix import YouTube
from pytubefix.cli import on_progress
from tkinter import *
from tkinter import ttk

root = Tk()
root.title("Descarga videos de youtube")

def descargar_video(url):
    yt = YouTube(url, on_progress_callback=on_progress)
    ys = yt.streams.get_highest_resolution()
    ys.download()

def descargar_audio(url):
    yt = YouTube(url, on_progress_callback=on_progress)
    ys = yt.streams.get_audio_only()
    ys.download()

def seleccionar_descarga(event=None):
    indice = tv.current()

    if indice == 0:
        btn_descargar.config(
            text="Descargar Video",
            command=lambda: descargar_video(txturl.get())
        )

    elif indice == 1:
        btn_descargar.config(
            text="Descargar Audio",
            command=lambda: descargar_audio(txturl.get())
        )

    btn_descargar.grid(column=2, row=1, sticky=W)

mainframe = ttk.Frame(root, padding="10")
mainframe.grid(column=0, row=0, sticky=(N, W, E, S))

ttk.Label(mainframe, text="Agregar URL del video").grid(
    column=1, row=0, sticky=W
)

txturl = StringVar()
url_entry = ttk.Entry(mainframe, width=50, textvariable=txturl)
url_entry.grid(column=1, row=1, sticky=(W, E))

tvideo = StringVar()
tv = ttk.Combobox(mainframe, textvariable=tvideo)
tv["values"] = ("Video", "Audio")
tv.grid(column=1, row=2, sticky=(W, E))

# Botón oculto inicialmente
btn_descargar = ttk.Button(mainframe)
btn_descargar.grid_remove()

tv.bind("<<ComboboxSelected>>", seleccionar_descarga)

root.mainloop()

#descarga de audios
#url = "https://www.youtube.com/watch?v=yrYBsXOns3E"

#yt = YouTube(url, on_progress_callback=on_progress)
#print(yt.title)

#ys = yt.streams.get_audio_only()
#ys.download()
#print(ys.download())


#Descarga de videos de youtube
#url = "https://youtu.be/C4o8X3-BvcQ?si=_1-MBJYblOL4UKsj"

#yt = YouTube(url, on_progress_callback=on_progress)
#print(yt.title)

#ys = yt.streams.get_highest_resolution()
#ys.download()
#print(ys.download)