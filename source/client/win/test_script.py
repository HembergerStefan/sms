import ctypes
ctypes.windll.user32.MessageBoxW(0, "It works!", "Test Title", 1)


__import__('webbrowser').open('http://google.com', new=2)
